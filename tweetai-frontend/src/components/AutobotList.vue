<template>
  <div>
    <!-- <h2>Autobots</h2> -->
    <h2>Current Autobots Count: {{ count }}</h2>
  </div>

  <!--page start-->
  <div class="page">
    <!--site-main start-->
    <div class="site-main">
      <!-- blog-section end -->
      <section class="ttm-row grid-section ttm-bgcolor-grey clearfix">
        <div class="container">
          <!-- row -->
          <div class="row">
            <div class="col-lg-4 col-md-6" v-for="autobot in autobots" :key="autobot.id">
              <!-- featured-imagebox-blog -->
              <div class="featured-imagebox featured-imagebox-blog style2 mb-30">
                <div class="featured-thumbnail">
                  <!-- featured-thumbnail -->
                  <img class="img-fluid" src="images/blog/05.jpg" alt="" />
                  <div class="ttm-blog-overlay-iconbox">
                    <!-- <a href="single-blog.html"><i class="ti ti-plus"></i></a> -->

                    <router-link :to="{ name: 'SinglePost', params: { id: autobot.id } }">
                      <i class="ti ti-plus"></i>
                    </router-link>
                  </div>
                  <div class="ttm-box-view-overlay"></div>
                </div>
                <div class="featured-content">
                  <!-- featured-content -->
                  <div class="ttm-box-post-date">
                    <!-- ttm-box-post-date -->
                    <span class="ttm-entry-date">
                      <time class="entry-date" datetime="2019-01-16T07:07:55+00:00">
                        {{ getDay(autobot.createdAt) }}<span class="entry-month entry-year"> {{ getMonth(autobot.createdAt) }}</span></time
                      >
                    </span>
                  </div>
                  <div class="featured-title">
                    <!-- featured-title -->
                    <h5>
                      <!-- <a href="single-blog.html">{{ autobot.title }}</a> -->
                      <router-link :to="{ name: 'SinglePost', params: { id: autobot.id } }">
                        {{ autobot.title }}
                      </router-link>
                    </h5>
                  </div>
                  <div class="post-meta">
                    <!-- post-meta -->
                    <!-- <span class="ttm-meta-line"><i class="fa fa-comments"></i>2,comments</span> -->
                    <span class="ttm-meta-line"><i class="fa fa-user"></i>By : {{ autobot.Autobot.name }}</span>
                  </div>
                </div>
              </div>
              <!-- featured-imagebox-blog end -->
            </div>
          </div>
        </div>
      </section>
      <!-- process-section end -->
    </div>
    <!--site-main end-->
  </div>
  <!-- page end -->
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      autobots: [],

      count: 0,
      requestCount: 0, // Track the number of requests made in the current minute
      maxRequestsPerMinute: 5,
      page: 0, // Default page number
    };
  },
  methods: {
    async fetchAutobots() {
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/autobot/post-list`);

        console.log(response.data.data);
        this.autobots = response.data.data;
      } catch (error) {
        console.error("Error fetching Autobots:", error);
      }
    },

    getDay(dateString) {
      const date = new Date(dateString);
      return date.getUTCDate(); // Returns the day of the month (1-31)
    },
    getMonth(dateString) {
      const date = new Date(dateString);
      return date.toLocaleString("default", { month: "short" }); // Returns the full name of the month
    },

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
    this.fetchAutobots();

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
.hm-gradient {
  background-image: linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%);
}
.darken-grey-text {
  color: #2e2e2e;
}
.input-group.md-form.form-sm.form-2 input {
  border: 1px solid #bdbdbd;
  border-top-left-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
}
.input-group.md-form.form-sm.form-2 input.purple-border {
  border: 1px solid #9e9e9e;
}
.input-group.md-form.form-sm.form-2 input[type="text"]:focus:not([readonly]).purple-border {
  border: 1px solid #ba68c8;
  box-shadow: none;
}
.form-2 .input-group-addon {
  border: 1px solid #ba68c8;
}
.danger-text {
  color: #ff3547;
}
.success-text {
  color: #00c851;
}
.table-bordered.red-border,
.table-bordered.red-border th,
.table-bordered.red-border td {
  border: 1px solid #ff3547 !important;
}
.table.table-bordered th {
  text-align: center;
}
</style>
