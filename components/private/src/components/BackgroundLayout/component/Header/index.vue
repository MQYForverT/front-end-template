<template>
	<el-header class="header">
		<div class="h-full flex-y-center">
			<MenuCollapse />
			<Breadcrumb />
		</div>
		<div class="h-full flex-y-center">
			<FullScreen v-if="props.isFullScreen" />
			<Language v-if="props.language.show" />
			<UserAvatar v-if="props.userAvatar.show" />
		</div>
	</el-header>
</template>

<script lang="ts" setup>
	import MenuCollapse from './MenuCollapse.vue'
	import Breadcrumb from './Breadcrumb.vue'
	import FullScreen from './FullScreen.vue'
	import Language from './Language.vue'
	import UserAvatar from './UserAvatar.vue'

	import useInject from '../../hooks/useInject'

	const { props } = useInject()
</script>

<style>
	@unocss-placeholder;
</style>

<style lang="scss">
	.header {
		@apply flex-y-center justify-between h-14 p-x-0 bg-[var(--el-bg-color)] shadow-[0_0_1px_#888];
	}
</style>
