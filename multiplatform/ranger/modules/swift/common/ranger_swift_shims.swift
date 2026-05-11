import Foundation

// Ranger Swift output currently expects JS-like float helpers.
let undefined: Double? = nil

func parseFloat(_ value: String) -> Double {
    return Double(value) ?? Double.nan
}

func isNaN(_ value: Double) -> Bool {
    return value.isNaN
}
