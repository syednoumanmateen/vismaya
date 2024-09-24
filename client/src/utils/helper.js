const Obj = {
    isObject: (object) => {
        if (object) return Object.keys(object).length
    }
}

export default Obj