class Counter {
    count = $state(0);

    increment() { 
        this.count += 1 
        localStorage.setItem("counter", this.count);
    };

    set(c: Number) {
        this.count = c;
    }
}

export const globalCounter = new Counter();