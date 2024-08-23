<template>
  <div>
    <h2>Current Autobots Count: {{ count }}</h2>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      count: 0,
      requestCount: 0, // Track the number of requests made in the current minute
      maxRequestsPerMinute: 5,
      page: 0, // Default page number
    };
  },
  methods: {
    async fetchAutobotCount() {
      // Prevent making more requests if the limit is reached
      if (this.requestCount >= this.maxRequestsPerMinute) {
        console.warn("Rate limit exceeded. Try again later.");
        return;
      }

      try {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/autobot/count`, {
          params: {
            page: this.page,
          },
        });

        // Extract count from the response based on the structure provided
        if (response.data.success) {
          this.count = response.data.data.count;
        } else {
          console.error("Failed to fetch Autobots count:", response.data.message);
        }

        this.requestCount++; // Increment request count after a successful request
      } catch (error) {
        console.error("Error fetching Autobots count:", error);
      }
    },

    // Reset request count every minute
    resetRequestCount() {
      this.requestCount = 0;
    },
  },
  created() {
    // Fetch Autobots count initially
    this.fetchAutobotCount();
    // Set up interval to fetch data every minute
    this.interval = setInterval(() => this.fetchAutobotCount(), 60000);
    // Reset request count every minute
    this.resetInterval = setInterval(() => this.resetRequestCount(), 60000);
  },
  beforeUnmount() {
    // Clean up intervals when component is unmounted
    clearInterval(this.interval);
    clearInterval(this.resetInterval);
  },
};
</script>

<style scoped>
/* Add styles here */
</style>
