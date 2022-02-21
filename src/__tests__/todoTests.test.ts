import { Builder, By, Capabilities, until, WebDriver, } from "selenium-webdriver";
// for getting tools to allow us to hook into chrome and automate
const chromedriver = require("chromedriver");
const driver: WebDriver = new Builder().withCapabilities(Capabilities.chrome()).build();
// for automating the website

class TodoPage {
  todoInput: By = By.css('.new-todo');
  todos: By = By.css("li.todo");
  todoLabel: By = By.css("label");
  todoComplete: By = By.css(".toggle");
  star: By = By.xpath(`//span[@class="star"]`);
  clearCompletedButton: By = By.css("button.clear-completed");
  // all of the selectors used in testing

  driver: WebDriver;
  // telling the driver to be used within these parameters
  url: string = "https://devmountain.github.io/qa_todos/#/all"

  constructor(driver: WebDriver) {
    this.driver = driver;
  }
}
const tp = new TodoPage(driver);
// tells the function to grab the driver from our constructor

describe("Todo website", () => {
  beforeEach(async () => {
    await driver.get(tp.url);
  });
  afterAll(async () => {
    await driver.quit();
  })
  it("Adds a todo", async () => {
    await driver.wait(until.elementLocated(tp.todoInput));
    await driver.findElement(tp.todoInput).sendKeys("Zane is testing this todo stuff I guess\n")
  });
  it("Can remove a todo", async () => {
    let myTodos = await driver.findElements(tp.todos);
    await myTodos.filter(async (todo) => {(await (await todo.findElement(tp.todoLabel)).getText()) == "Zane is testing this todo stuff I guess" })
    [0].findElement(tp.todoComplete).click();
    //setting every item in this array to a "todo"
    await (await driver.findElement(tp.clearCompletedButton)).click();
  })
  it("Can star a todo", async () => {
    await driver.wait(until.elementLocated(tp.todoInput));
    await driver.findElement(tp.todoInput).sendKeys("Zane is testing this todo stuff I guess\n")
    await driver.wait(until.elementLocated(tp.star))
      .findElement(tp.star).click();
  })
});
// Challenge from the Dre 
//I want you to at some point create a list of 5 todos then star the 5th one
//Then delete the second todo
