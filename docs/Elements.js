export class Elements {
    static getElements(config) {
        return Object.keys(config)
            .filter((k) => k === null || k === void 0 ? void 0 : k.includes(Elements.KEY))
            .reduce((acc, str) => {
            const key = config[str];
            if (typeof key === 'string') {
                acc[str] = document.querySelector(key);
            }
            return acc;
        }, Elements.values);
    }
}
Elements.values = {};
Elements.KEY = '_SELECTOR';
