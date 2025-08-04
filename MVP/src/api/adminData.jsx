export async function fetchAdminStats() {

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          eWasteCollected: '7.2 Tons',
          eprReports: '45 Brands',
          recyclers: 29,
          users: '4,212 Users',
          co2Saved: '11.5 Tons',
          refurbishedSold: 874
        });
      }, 300);
    });
  }
  