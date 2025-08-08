package com.ReLife.service;

import com.ReLife.dto.PaymentDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.razorpay.Order;
import com.razorpay.Payment;
import com.razorpay.RazorpayClient;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@Service
public class PaymentService {
    private static final String RAZORPAY_PREFERENCES_URL = "https://api.razorpay.com/v2/standard_checkout/preferences";
	private static final String APPLICATION_JSON = "application/json";
	private static final String BASIC = "Basic ";
	private static final String AUTHORIZATION = "Authorization";
	private static final String CONTENT_TYPE = "Content-Type";
	private static final String QR_REQUIRED = "qr_required";
	private static final String ORDER_ID = "order_id";
	private static final String ID = "id";
	private static final String INR = "INR";
	private static final String CURRENCY = "currency";
	private static final String AMOUNT = "amount";
	
	private final RazorpayClient razorpay;
    private final String razorpayKey;
    private final String razorpaySecret;
    private final ObjectMapper mapper = new ObjectMapper();

    public PaymentService(@Value("${RAZORPAY_KEY}") String key,@Value("${RAZORPAY_SECRET}") String secret) throws Exception {
        this.razorpay     = new RazorpayClient(key, secret);
        this.razorpayKey   = key;
        this.razorpaySecret= secret;
    }

    public PaymentDto createOrder(int amount) throws Exception {
        JSONObject opts = new JSONObject()
            .put(AMOUNT, amount)
            .put(CURRENCY, INR);
        Order order = razorpay.Orders.create(opts);
        return new PaymentDto(
          order.get(ID),
          order.get(AMOUNT),
          order.get(CURRENCY)
        );
    }

    public Payment capturePayment(String paymentId, int amount) throws Exception {
        return razorpay.Payments.capture(
          paymentId,
          new JSONObject().put(AMOUNT, amount)
        );
    }

    public Map<String, Object> createCheckoutPreference(String orderId, int amount) throws Exception {
        Map<String,Object> bodyMap = new HashMap<>();
        bodyMap.put(ORDER_ID, orderId);
        bodyMap.put(AMOUNT, amount);
        bodyMap.put(CURRENCY, INR);
        bodyMap.put(QR_REQUIRED, true);
        String body = mapper.writeValueAsString(bodyMap);

        String authRaw = razorpayKey + ":" + razorpaySecret;
        String authEnc = Base64
          .getEncoder()
          .encodeToString(authRaw.getBytes(StandardCharsets.UTF_8));

        HttpRequest req = HttpRequest.newBuilder()
          .uri(URI.create(RAZORPAY_PREFERENCES_URL))
          .header(CONTENT_TYPE, APPLICATION_JSON)
          .header(AUTHORIZATION, BASIC + authEnc)
          .POST(HttpRequest.BodyPublishers.ofString(body))
          .build();

        HttpResponse<String> resp = HttpClient
          .newHttpClient()
          .send(req, HttpResponse.BodyHandlers.ofString());

        if (resp.statusCode() != 200 && resp.statusCode() != 201) {
            throw new RuntimeException(resp.body());
        }
        
        return mapper.readValue(resp.body(), Map.class);
    }
}
