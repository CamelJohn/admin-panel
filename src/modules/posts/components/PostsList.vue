// Edited By: Jonathan Atia

// So I wrapped the table with a 'div'.
// Added a label & input -> since I did not want to start messing around with the core "FormInput" - too convoluted for me.
// Chaned the 'posts' to 'filteredPosts' on the 'v-for' tr.
// This builds on top of the fact that this component holds a 'searchTerm' in the 'data'.
// Then with the help of a computed method -> remap the 'posts' to show only text filtered posts.

// Honestly -> your project is cool, and I probably did not fix this the 'grenpress way'.
// But...I'ts way too much code to get into for me. 
// I'ts a simple fix (assuming it works).
// Getting it to work the 'greenpress way' so that the components play nicely togather...way above my capabilities on
// an idle friday.

<template>
  <div>
		<label>Posts Filter</label>
		<input type="text" v-mode="searchTerm">
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Category</th>
          <th>Path</th>
          <th>Public</th>
          <th>Pinned</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in filteredPosts" :key="post._id">
          <td>
            <router-link
              :to="{ name: 'editPost', params: { postId: post._id } }"
            >
              {{ post.title }}
            </router-link>
          </td>
          <td>
            <router-link
              :to="{
                name: 'editCategory',
                params: { categoryPath: post.category.path }
              }"
            >
              {{ post.category.name }}
            </router-link>
          </td>
          <td>{{ post.path }}</td>
          <td><i v-if="post.isPublic" class="el-icon-check" /></td>
          <td><i v-if="post.isPinned" class="el-icon-check" /></td>
          <td>
            <i @click.prevent="remove(post._id)" class="el-icon-delete" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { usePostsList } from '../compositions/posts'
import { useConfirmAction } from '../../core/compositions/confirm-action'

export default {
  setup() {
    const { posts, remove } = usePostsList()
    return { posts, remove: useConfirmAction(remove) }
  },
  data() {
    return {
      searchTerm: ''
    }
  },
  computed: {
    filteredPosts() {
      if (this.searchTerm.length > 0) {
        return this.posts.fitler((post) =>
          new RegExp(`^${this.searchTerm}`, 'i').test(post.title)
        )
      }
			return posts;
    }
  }
}
</script>
<style scoped lang="scss">
</style>
