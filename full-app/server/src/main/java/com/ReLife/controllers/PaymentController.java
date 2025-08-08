package com.ReLife.controllers;

import com.ReLife.dto.PaymentDto;
import com.ReLife.service.PaymentService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.razorpay.Payment;
import com.razorpay.RazorpayException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(originPatterns = "*") // change as per requirement in production
public class PaymentController {
    private static final String WEBHOOK_PROCESSING_FAILED = "Webhook processing failed";
	private static final String OK = "ok";
	private static final String STATUS = "status";
	private static final String PAYMENT_FAILED = "payment.failed";
	private static final String PAYMENT_CAPTURED = "payment.captured";
	private static final String X_RAZORPAY_SIGNATURE = "X-Razorpay-Signature";
	private static final String ORDER_ID_IS_REQUIRED = "Order ID is required";
	private static final String ORDER_ID = "order_id";
	private static final String PAYMENT_CAPTURE_FAILED = "Payment capture failed: ";
	private static final String PAYMENT_ID_REQUIRED = "Payment ID is required";
	private static final String PAYMENT_ID = "payment_id";
	private static final String INTERNAL_SERVER_ERROR = "Internal server error";
	private static final String PAYMENT_SERVICE_ERROR = "Payment service error";
	private static final String AMOUNT_POSITIVE = "Amount must be positive";
	private static final String AMOUNT_REQUIRED = "Amount is required";
	private static final String ERROR = "error";
	private static final String AMOUNT = "amount";
	private static final Logger logger = LoggerFactory.getLogger(PaymentController.class);
    private final ObjectMapper mapper = new ObjectMapper();
    private final PaymentService service;

    public PaymentController(PaymentService service) { 
        this.service = service; 
    }

    @PostMapping("/order")
    public ResponseEntity<?> createOrder(@RequestBody Map<String, Object> req) {
        try {
            Object amountObj = req.get(AMOUNT);
            if (amountObj == null) {
                return ResponseEntity.badRequest()
                    .body(Map.of(ERROR, AMOUNT_REQUIRED));
            }
            
            int amount = (Integer) amountObj;
            if (amount <= 0) {
                return ResponseEntity.badRequest()
                    .body(Map.of(ERROR, AMOUNT_POSITIVE));
            }
            
            PaymentDto order = service.createOrder(amount);
            logger.info("Order created: {}", order.id());
            
            return ResponseEntity.ok(order);
            
        } catch (RazorpayException e) {
            logger.error("Razorpay error creating order: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of(ERROR, PAYMENT_SERVICE_ERROR));
        } catch (Exception e) {
            logger.error("Unexpected error creating order: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of(ERROR, INTERNAL_SERVER_ERROR));
        }
    }

    @PostMapping("/capture")
    public ResponseEntity<?> capture(@RequestBody Map<String, Object> req) {
        try {
            String paymentId = (String) req.get(PAYMENT_ID);
            Object amountObj = req.get(AMOUNT);
            
            if (paymentId == null || paymentId.trim().isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(Map.of(ERROR, PAYMENT_ID_REQUIRED));
            }
            
            if (amountObj == null) {
                return ResponseEntity.badRequest()
                    .body(Map.of(ERROR, AMOUNT_REQUIRED));
            }
            
            int amount = (Integer) amountObj;
            
            Payment result = service.capturePayment(paymentId, amount);
            logger.info("Payment captured: {}", paymentId);
            
            return ResponseEntity.ok(result);
            
        } catch (RazorpayException e) {
            logger.error("Razorpay error capturing payment: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of(ERROR, PAYMENT_CAPTURE_FAILED + e.getMessage()));
        } catch (Exception e) {
            logger.error("Unexpected error capturing payment: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of(ERROR, INTERNAL_SERVER_ERROR));
        }
    }

    @PostMapping("/preference")
    public ResponseEntity<Map<String, Object>> createPreference(@RequestBody Map<String, Object> req) {
        try {
            String orderId = (String) req.get(ORDER_ID);
            Object amountObj = req.get(AMOUNT);
            
            if (orderId == null || orderId.trim().isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(Map.of(ERROR, ORDER_ID_IS_REQUIRED));
            }
            
            if (amountObj == null) {
                return ResponseEntity.badRequest()
                    .body(Map.of(ERROR, AMOUNT_REQUIRED));
            }
            
            int amount = (Integer) amountObj;
            
            Map<String, Object> pref = service.createCheckoutPreference(orderId, amount);
            logger.info("Preference created for order: {}", orderId);
            
            return ResponseEntity.ok(pref);
            
        } catch (RuntimeException ex) {
            logger.error("Runtime error creating preference: {}", ex.getMessage());
            try {
                Map<?, ?> errorObj = mapper.readValue(ex.getMessage(), Map.class);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of(ERROR, errorObj.get(ERROR)));
            } catch (JsonProcessingException jsonEx) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of(ERROR, PAYMENT_SERVICE_ERROR));
            }
        } catch (Exception ex) {
            logger.error("Unexpected error creating preference: {}", ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of(ERROR, INTERNAL_SERVER_ERROR));
        }
    }

    @PostMapping("/webhook")
    public ResponseEntity<?> handleWebhook(@RequestBody String payload, 
                                          @RequestHeader(X_RAZORPAY_SIGNATURE) String signature) {
        try {
            logger.info("Received webhook with signature: {}", signature);
            
            Map<String, Object> webhookData = mapper.readValue(payload, Map.class);
            String event = (String) webhookData.get("event");
            
            logger.info("Processing webhook event: {}", event);
            
            switch (event) {
                case PAYMENT_CAPTURED:
                    break;
                case PAYMENT_FAILED:
                    break;
                default:
                    logger.info("Unhandled webhook event: {}", event);
            }
            
            return ResponseEntity.ok(Map.of(STATUS, OK));
            
        } catch (Exception e) {
            logger.error("Error processing webhook: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of(ERROR, WEBHOOK_PROCESSING_FAILED));
        }
    }
}