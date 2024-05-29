export const useSettingStore = createGlobalState(() => {
	const prefix = useTitle()
	// state
	const buttonSize = useStorage(`${prefix}-size`, 'default')

	return { buttonSize }
})
