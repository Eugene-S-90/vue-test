<template>
<div class="main-wrapper">
  <div class="left-sidebar">
<sidebar/>
  </div>
  <div class="main-content">
  <visualComponent/>
  <textComponent/>
  </div>

</div>
</template>

<script>
import visualComponent from "./containers/visualComponent";
import textComponent from "./containers/textComponent";
import sidebar from "./containers/leftSidebarComponent";
export default {
  components: {
    visualComponent,
    textComponent,
    sidebar
  }
};
</script>


<style scoped>
/* ================
     MAIN + GRID
=================== */
body {
  font-size: 14px;
  margin: 0px;
  padding: 0px;
  width: 100%;
  overflow-x: hidden;
}
.main-wrapper {
  display: flex;
}
.left-sidebar {
  width: 25%;
}
.main-content {
  width: 75%;
}
/* ================
     MAIN + GRID
=================== */
</style>
