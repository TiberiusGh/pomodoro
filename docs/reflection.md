# Requirements:

Skriv en kort (4-6 meningar) reflektion för varje kapitel om hur just det kapitlet har påverkat eller inte påverkat din kod. Använd bokens termer. Ge exempel med läsbara screenshots från er kod till varje reflektion

## Chapter 1. Clean Code

Acording to Robert C. Martin, one can be really productive in the beginning, even if the developer uses "bad code" but that bad code will lead to slow development further down the line since more and more time would be required to understand the code that is at the core of the system. This is something that has resonated with me trough the whole project. I've found it particullary hard to write front end application trough OOP which led me to some "unwise" decissions at the core of the app that i later had to refactor. For example breaking logic from the app's front end class.

## Chapter 2. Meningful Names

Finding **intention revealing names**, that are neither **disinformative**, **cute** nor **uninformative** has been challenging and took some time. Furthermore, what feels like a good name at some moment in time, makes little to no sense at a later time. Variable, method and class **names have been changed** constantly troughout the development of the application when newer, better names arised.

Trough the development of the application, active thought about using **nouns as variable names** and **verbs as method names** has been made. An attempt for keeping **one word** per concept has been made but a common problem that i've stubled uppon is that i'm not allways sure how some methods would be implemented, which later leads to refactoring of method's logic but forgeting to change the name of the method.

I've tryed to use longer words when developing the application. This improved the code readability and pronunceability but it also made the IDE's intellisense slower to suggest the right "word" since common words produce more matches.

## Chapter 3. Functions

Acording to Clean Code, the ideal number of arguments in a function is zero **(niladic)**. To achieve this in OOP, i've used private fields for storing values. Function calls would later not need arguments since they would instead use the value stored in the field. I'm not sure if this is a good pattern to follow and there have been cases where this solution was not posible. Nevertheless, the pplication uses at most two arguments **(monadic)**. In some instances the logic have been refactored so that the method takes **one argument that is a data structure**, instead of multiple arguments.

**Small function that do one thing and do it well** is the aim for function according to Clean Code. Writing a front end application in OOP has provided to be significantly more challenging than anticipated. This lead to my methods not allways following those principles. But according to Robert C. Martin, writing a funtion is like writing a paper where one first get it's thoughts down on paper and later change the wording so it reads well. Focus now for my code should be assigned in refactoring methods so that they become **smaller**, **do one thing**, **take int acount the level of abstraction** and **avoid side effects**.

## Chapter 4. Comments

I do agree with Robert C. Martin in that **comments are often lying**. My poor current knowledge in programming leads me to refactoring of code and forgetting to change the name of variables and methods from time to time. I believe that keeping the comments updated would provide to be even less probable.

Having said that, I have used comments in my code in some areas where i stil believe they are making sense. Some example are:

- **Informative Comment** - Where typescript's intelisense would throw weird error that did not effect the code execution ::TODO:: \*ADD PRINT SCR EXAMPLE
- ** Explanation of intent** - Where calling the method would make the countdown increase it's speed. I realise that explanation of intent has to do with the reader's current knowledge. What's obvious for one developer is not that clear for another ![explanation intent](.img/explanationIntent.png)
- **Banners** - The book argues that banners are in the bad category of comments, particullary when over used. I found if helpful in my html file when delimiting html templates from the rest of the html code. ![banner comment](.img/bannerComment.png)

In developing the applciation, there has been an avoidance for comenting out code. Unused code has been deleted instead.
