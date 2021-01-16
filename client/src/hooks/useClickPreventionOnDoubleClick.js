import useCancellablePromises from './useCancellablePromises'

export const cancellablePromise = promise => {
    let isCanceled = false

    const wrappedPromise = new Promise((resolve, reject) => {
        promise.then(
        value => (isCanceled ? reject({ isCanceled, value }) : resolve(value)),
        error => reject({ isCanceled, error }),
        )
    })

    return {
        promise: wrappedPromise,
        cancel: () => (isCanceled = true),
    }
}

export const delay = n => new Promise(resolve => setTimeout(resolve, n))


export const useClickPreventionOnDoubleClick = (onClick = () => undefined, onDoubleClick = () => undefined) => {
    const api = useCancellablePromises()

    const handleClick = (e) => {
        api.clearPendingPromises()
        const waitForClick = cancellablePromise(delay(300))
        api.appendPendingPromise(waitForClick)

        return waitForClick.promise
        .then(() => {
            api.removePendingPromise(waitForClick)
            onClick(e)
        })
        .catch(errorInfo => {
            api.removePendingPromise(waitForClick)
            if (!errorInfo.isCanceled) {
                throw errorInfo.error
            }
        })
    }
    
    const handleDoubleClick = (e) => {
        api.clearPendingPromises()
        onDoubleClick(e)
    }

    return [handleClick, handleDoubleClick]
    }

export default useClickPreventionOnDoubleClick