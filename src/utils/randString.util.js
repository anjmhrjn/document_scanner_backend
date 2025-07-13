module.exports = {
  randomString: function (length) {
    // length of the random string
    let randomString = ""
    let randomPool =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for (let i = 0; i < length; i++) {
      let randomPoz = Math.floor(Math.random() * randomPool.length)
      randomString += randomPool.substring(randomPoz, randomPoz + 1)
    }
    return randomString
  },

  generateUniqueCode: function (maxLength) {
    // Define the characters that can be included in the code
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}[]|;:,.<>?"

    // Generate a random length for the code between 15 and maxLength
    const codeLength = Math.floor(Math.random() * (maxLength - 14)) + 15

    // Generate a random code
    let code = ""
    for (let i = 0; i < codeLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length)
      code += characters.charAt(randomIndex)
    }

    return code
  },
}
