<template>
  <!-- Used when user is also author -->
  <span v-if="canModify">
    <router-link
      class="btn btn-sm btn-outline-secondary"
      :to="{ name: 'article-edit', params: { slug: article.slug } }"
    >
      <i class="ion-edit"></i><span>&nbsp;Edit Article</span>
    </router-link>
    <span>&nbsp;&nbsp;</span>
    <button class="btn btn-outline-danger btn-sm" @click="deleteArticle">
      <i class="ion-trash-a"></i><span>&nbsp;Delete Article</span>
    </button>
  </span>
  <!-- Used in ArticleView when not author -->
  <span v-else>
    <button class="btn btn-sm btn-outline-secondary" @click="toggleFollow">
      <i class="ion-plus-round"></i> <span>&nbsp;</span>
      <span
        >{{ profile.following ? 'Unfollow' : 'Follow' }}
        {{ article.author.username }}</span
      >
    </button>
    <span>&nbsp;&nbsp;</span>
    <button
      class="btn btn-sm"
      @click="toggleFavorite"
      :class="{
        'btn-primary': article.favorited,
        'btn-outline-primary': !article.favorited
      }"
    >
      <i class="ion-heart"></i><span>&nbsp;</span>
      <span>
        {{ article.favorited ? 'Unfavorite Article' : 'Favorite Article' }}
      </span>
      <span class="counter"> ({{ article.favoritesCount }}) </span>
    </button>
  </span>
</template>

<script></script>
