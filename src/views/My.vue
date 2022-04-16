<template>
    <div class="my">
        my
        <button @click="$router.back()">goback</button>
    </div>
</template>

<script>
    export default {
        name: "My",
        created() {
            console.log("my hi");
        },
    };
</script>
