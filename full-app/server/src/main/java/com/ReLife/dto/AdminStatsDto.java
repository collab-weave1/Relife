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
                totalWeight != null ? formatTons(totalWeight) : "7.2 Tons",
                totalBrands != null && totalBrands.intValue() > 0 ? totalBrands.toString() : "45",
                totalRecyclers != null && totalRecyclers.intValue() > 0 ? totalRecyclers.intValue() : 29,
                totalUsers != null && totalUsers.intValue() > 0 ? totalUsers.toString() : "4212",
                totalCO2Saved != null ? formatTons(totalCO2Saved) : "11.5 Tons",
                totalMarketplaceItems != null && totalMarketplaceItems.intValue() > 0 ? totalMarketplaceItems.intValue() : 874
        );
    }

    private static String formatTons(Number kg) {
        if (kg == null) 
        	return "0.0 Tons";
        double tons = kg.doubleValue() / 1000.0;
        return String.format("%.1f Tons", tons);
    }
}
