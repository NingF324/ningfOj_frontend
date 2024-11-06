<template>
  <div id="exampleView">
    <code-editor :value="codeValue" :handle-change="onCodeChange" />
    <MdEditor :value="mdValue" :handle-change="onMdChange" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import CodeEditor from "@/components/codeEditor.vue"; // @ is an alias to /src

const mdValue = ref();
const codeValue = ref();
const onMdChange = (v: string) => {
  mdValue.value = v;
  console.log(mdValue);
};

const onCodeChange = (v: string) => {
  codeValue.value = v;
  console.log(codeValue);
};
</script>
