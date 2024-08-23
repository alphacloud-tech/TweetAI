<template>
  <!-- page start -->
  <div class="page">
    <!-- site-main start -->
    <div class="site-main">
      <!-- sidebar -->
      <div class="sidebar ttm-bgcolor-white clearfix">
        <div class="container">
          <!-- row -->
          <div class="row">
            <div class="col-lg-12 content-area">
              <!-- ttm-service-single-content-are -->
              <article v-if="post && post.Autobot" class="post ttm-blog-single clearfix">
                <!-- post-featured-wrapper -->
                <div class="ttm-post-featured-wrapper">
                  <div class="ttm-post-featured">
                    <!-- <img v-if="post.image" class="img-fluid" :src="post.image" alt="" /> -->
                    <img class="img-fluid" src="/images/blog/post-01.jpg" alt="post-01" />
                  </div>
                </div>
                <!-- post-featured-wrapper end -->
                <!-- ttm-blog-classic-content -->
                <div class="ttm-blog-single-content">
                  <div class="entry-content">
                    <div class="ttm-post-entry-header">
                      <div class="post-meta">
                        <span class="ttm-meta-line byline" v-if="post.Autobot.name"><i class="fa fa-user"></i>By {{ post.Autobot.name }}</span>
                        <span class="ttm-meta-line entry-date" v-if="post.createdAt"
                          ><i class="fa fa-calendar"></i><time class="entry-date published">{{ formatDate(post.createdAt) }}</time></span
                        >
                        <span class="ttm-meta-line tags-links"><i class="fa fa-comment-o"></i>{{ post.Comments ? post.Comments.length : 0 }}</span>
                      </div>
                    </div>
                    <!-- separator -->
                    <div class="separator">
                      <div class="sep-line mt-15 mb-25"></div>
                    </div>

                    <h4>{{ post.title }}</h4>
                    <!-- separator -->
                    <p class="mb-30">{{ post.body }}</p>

                    <div class="separator">
                      <div class="sep-line mt-25 mb-25"></div>
                    </div>

                    <div class="ttm-blog-classic-box-comment" v-if="post.Comments && post.Comments.length">
                      <div id="comments" class="comments-area">
                        <h5 class="comments-title">({{ post.Comments.length }}) Comments to “{{ post.title }}”</h5>
                        <ol class="comment-list">
                          <li v-for="comment in post.Comments" :key="comment.id">
                            <div class="comment-body">
                              <div class="comment-author vcard">
                                <!-- <img src="images/blog/blog-comment-01.jpg" class="avatar" alt="comment-img" /> -->
                              </div>
                              <div class="comment-box">
                                <div class="comment-meta commentmetadata">
                                  <cite class="ttm-comment-owner">Comment By : {{ comment.name }}</cite>
                                  <a href="">{{ formatDate(comment.createdAt) }}</a>
                                </div>
                                <div class="author-content-wrap">
                                  <p>{{ comment.body }}</p>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- ttm-blog-classic-content end -->
              </article>
            </div>
          </div>
          <!-- row end -->
        </div>
      </div>
      <!-- sidebar end -->
    </div>
    <!-- site-main end -->
  </div>
  <!-- page end -->
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      post: {},
      comments: [],
      loading: false,
      error: null,
    };
  },
  methods: {
    async fetchPost() {
      this.loading = true;
      this.error = null;
      try {
        const postId = this.$route.params.id;
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/autobot/post/show/${postId}`);
        this.post = response.data.data;
      } catch (error) {
        this.error = "Error fetching post.";
        console.error("Error fetching post:", error);
      } finally {
        this.loading = false;
      }
    },

    formatDate(dateString) {
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("en-US", options).format(date);
    },
  },
  watch: {
    "$route.params.id": {
      immediate: true,
      handler() {
        this.fetchPost();
      },
    },
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
.error {
  color: red;
  font-weight: bold;
}
</style>
