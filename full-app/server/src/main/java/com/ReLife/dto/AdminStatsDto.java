package com.ReLife.dto;

public record AdminStatsDto(
        String totalWeight,
        String totalBrands,
        int totalRecyclers,
        String totalUsers,
        String totalCO2Saved,
        int totalMarketplaceItems
) {
    public AdminStatsDto(Number totalWeight, Number totalBrands, Number totalRecyclers, Number totalUsers, Number totalCO2Saved, Number totalMarketplaceItems) {
        this(
                formatTons(totalWeight),
                totalBrands.toString(),
                totalRecyclers.intValue(),
                totalUsers.toString(),
                formatTons(totalCO2Saved),
                totalMarketplaceItems.intValue()
        );
    }

    private static String formatTons(Number kg) {
        double tons = kg.doubleValue() / 1000.0;
        return String.format("%.1f Tons", tons);
    }
}
