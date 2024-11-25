import {createInterface} from "readline";
import {model} from "../utils/model";

const chat = model.startChat({generationConfig: {maxOutputTokens: 1200}});

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

const input = (prompt: string) => {
    return new Promise<string>((resolve) => {
        rl.question(prompt, (answer) => {
            resolve(answer);
        });
    });
};

const main = async () => {
    const recipeCount = await input("No of recipes (for example, 5): ");
    const ingredients = await input("List of ingredients (for example, chicken, potatoes, and carrots): ");
    const filter = await input("Filter (for example, vegetarian, vegan, or gluten-free): ");

    rl.close();

    const promptForRecipes = `Show me ${recipeCount} recipes for a dish with the following ingredients: ${ingredients}. Per recipe, list all the ingredients used, no ${filter}`;

    let result = await chat.sendMessage(promptForRecipes);
    // const recipes = result.response.text();

    const promptForShoppingList = `Produce a shopping list for the generated recipes and please don't include ingredients that I already have. (Which is the ingredients I provided before)`;
    result = await chat.sendMessage(promptForShoppingList);
    console.log(result.response.text());
};


void main();
