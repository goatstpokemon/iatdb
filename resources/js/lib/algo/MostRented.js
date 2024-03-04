// Sample data representing purchases

// Function to find the most purchased product
export const mostPurchasedProduct = (purchases) => {
    const productCount = {};

    // Count occurrences of each product
    for (let purchase of purchases) {
        const { product } = purchase;
        productCount[product] = (productCount[product] || 0) + 1;
    }

    let maxCount = 0;
    let mostPurchasedProduct = "";

    // Find the product with the maximum count
    for (let product in productCount) {
        if (productCount[product] > maxCount) {
            maxCount = productCount[product];
            mostPurchasedProduct = product;
        }
    }

    return mostPurchasedProduct;
};
