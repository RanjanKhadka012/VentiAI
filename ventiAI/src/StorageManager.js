class StorageManager {
    constructor(storageKey = "ventingApp_conversations") {
        this.storageKey = storageKey;
        this._initializeStorage();
    }

    _initializeStorage() {
        if (typeof window === "undefined") {
            this.storage = {};
        } else {
            if (!localStorage.getItem(this.storageKey)) {
                localStorage.setItem(this.storageKey, JSON.stringify([]));
            }
        }
    }

    saveToLocal(ventText, tone, aiResponse) {
        const record = {
            id: this._generateId(),
            timestamp: new Date().toISOString(),
            text: ventText,
            emotion: tone,
            feedback: aiResponse
        };

        if (typeof window === "undefined") {
            if (!this.storage[this.storageKey]) {
                this.storage[this.storageKey] = [];
            }
            this.storage[this.storageKey].push(record);
        } else {
            const records = this._getRecords();
            records.push(record);
            localStorage.setItem(this.storageKey, JSON.stringify(records));
        }

        return record;
    }

    getAllRecords() {
        return this._getRecords();
    }

    getRecordsByTone(tone) {
        const records = this._getRecords();
        return records.filter(record => record.emotion === tone);
    }

    deleteRecord(id) {
        const records = this._getRecords();
        const filteredRecords = records.filter(record => record.id !== id);

        if (records.length === filteredRecords.length) {
            return false;
        }

        if (typeof window === "undefined") {
            this.storage[this.storageKey] = filteredRecords;
        } else {
            localStorage.setItem(this.storageKey, JSON.stringify(filteredRecords));
        }

        return true;
    }

    clearAllRecords() {
        if (typeof window === "undefined") {
            this.storage[this.storageKey] = [];
        } else {
            localStorage.setItem(this.storageKey, JSON.stringify([]));
        }
    }

    getRecordCount() {
        return this._getRecords().length;
    }

    _getRecords() {
        if (typeof window === "undefined") {
            return this.storage[this.storageKey] || [];
        } else {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : [];
        }
    }

    _generateId() {
        return `record_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
}

module.exports = StorageManager;
