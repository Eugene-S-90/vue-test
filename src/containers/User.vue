<template>
    <div>
         <h3>{{upperCasedName()}}</h3>
        {{description}}
       <h5>{{isActive}}</h5>
    </div>
</template>


<script>
export default {
  props: {
      name: {
          type: String,
          required: true
      },
      description:String,
      isActive:Boolean
  },
  methods: {
      upperCasedName () {
          return this.name.toUpperCase()
      }
  }
};
</script>
