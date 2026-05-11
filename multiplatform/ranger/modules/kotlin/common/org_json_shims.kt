package org.json

class JSONArray() {
    private val items: MutableList<Any?> = mutableListOf()

    constructor(seed: List<Any?>) : this() {
        items.addAll(seed)
    }

    fun put(value: Any?): JSONArray {
        items.add(value)
        return this
    }

    fun length(): Int {
        return items.size
    }

    fun get(index: Int): Any? {
        return items[index]
    }

    fun isNull(index: Int): Boolean {
        if (index < 0 || index >= items.size) {
            return true
        }
        return items[index] == null
    }

    fun toList(): List<Any?> {
        return items
    }

    override fun toString(): String {
        return stringifyJson(items)
    }
}

class JSONObject() {
    private val data: MutableMap<String, Any?> = linkedMapOf()

    constructor(raw: String) : this() {
        // Minimal shim: parsing is not required in NG harness path.
    }

    fun put(key: String, value: Any?): JSONObject {
        data[key] = value
        return this
    }

    fun isNull(key: String): Boolean {
        return (!data.containsKey(key)) || (data[key] == null)
    }

    fun optString(key: String): String {
        val value = data[key]
        return when (value) {
            null -> ""
            is String -> value
            else -> value.toString()
        }
    }

    fun optInt(key: String): Int {
        val value = data[key]
        return when (value) {
            null -> 0
            is Int -> value
            is Long -> value.toInt()
            is Double -> value.toInt()
            is Float -> value.toInt()
            is Number -> value.toInt()
            is String -> value.toIntOrNull() ?: 0
            else -> 0
        }
    }

    fun optDouble(key: String): Double {
        val value = data[key]
        return when (value) {
            null -> 0.0
            is Double -> value
            is Float -> value.toDouble()
            is Number -> value.toDouble()
            is String -> value.toDoubleOrNull() ?: 0.0
            else -> 0.0
        }
    }

    fun optBoolean(key: String): Boolean {
        val value = data[key]
        return when (value) {
            null -> false
            is Boolean -> value
            is String -> value.equals("true", ignoreCase = true)
            is Number -> value.toInt() != 0
            else -> false
        }
    }

    fun getJSONArray(key: String): JSONArray {
        val value = data[key]
        return when (value) {
            is JSONArray -> value
            is List<*> -> JSONArray(value as List<Any?>)
            else -> JSONArray()
        }
    }

    fun getJSONObject(key: String): JSONObject {
        val value = data[key]
        if (value is JSONObject) {
            return value
        }
        if (value is Map<*, *>) {
            val out = JSONObject()
            for ((k, v) in value) {
                if (k is String) {
                    out.put(k, v)
                }
            }
            return out
        }
        return JSONObject()
    }

    override fun toString(): String {
        return stringifyJson(data)
    }
}

private fun stringifyJson(value: Any?): String {
    return when (value) {
        null -> "null"
        is String -> "\"" + value
            .replace("\\", "\\\\")
            .replace("\"", "\\\"")
            .replace("\n", "\\n")
            .replace("\r", "\\r")
            .replace("\t", "\\t") + "\""
        is Boolean -> if (value) "true" else "false"
        is Number -> value.toString()
        is JSONObject -> value.toString()
        is JSONArray -> value.toString()
        is Map<*, *> -> {
            val parts = mutableListOf<String>()
            for ((k, v) in value) {
                if (k is String) {
                    parts.add(stringifyJson(k) + ":" + stringifyJson(v))
                }
            }
            "{" + parts.joinToString(",") + "}"
        }
        is Iterable<*> -> {
            val parts = mutableListOf<String>()
            for (item in value) {
                parts.add(stringifyJson(item))
            }
            "[" + parts.joinToString(",") + "]"
        }
        else -> stringifyJson(value.toString())
    }
}
