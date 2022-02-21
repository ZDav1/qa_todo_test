import {Builder,By,Capabilities,until,WebDriver,} from"selenium-webdriver";

const chromedriver = require("chromedriver");
const driver: WebDriver = new Builder().withCapabilities(Capabilities.chrome()).build();

const todoInput: By = By.css('.new-todo');
const todos: By = By.css("li.todo");
const todoLabel: By = By.css("label");
const todoComplete: By = By.css(".toggle");
const clearCompletedButton: By = By.css("button.clear-completed");

test("the todo app can add, complete, and clear a todo", async () => {
  await driver.get("https://devmountain.github.io/qa_todos/");
  await driver.wait(until.elementLocated(todoInput));
  await driver.findElement(todoInput).sendKeys("Zane is testing this todo stuff I guess\n");
  let myTodos = await driver.findElements(todos);
  let myTodo = await myTodos.filter(async (todo) => {
    (await (await todo.findElement(todoLabel)).getText()) == "Zane is testing this todo stuff I guess";
  });
  expect(myTodo.length).toEqual(1);
  await (await myTodo[0].findElement(todoComplete)).click();
  await (await driver.findElement(clearCompletedButton)).click();
  myTodos = await driver.findElements(todos);
  myTodo = await myTodos.filter(async (todo) => {
    (await (await todo.findElement(todoLabel)).getText()) == "Zane is testing this todo stuff I guess";
  });
  expect(myTodo.length).toEqual(0);
});

afterAll(async () => {
  await driver.quit();
});
