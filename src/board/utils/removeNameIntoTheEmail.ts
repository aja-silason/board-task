export const removeNameIntoEmail = (value: string) => {
    return value?.split("@")[0]
}