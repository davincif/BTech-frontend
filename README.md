# Betchfront

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.7.

### **How to run**

- dev mode

```shell
npm ci
npm run start
```

- production build

```shell
npm run build
```

### **About the Architecture**

No Speciall architecture was applyed here, in my view, that was enough to simply respect the layers and module separation of suggested angular, that is, respecting the rules of the MVC for instance:
Services never talk to view, controles never make requests, etc, etc...

A good think that I like to maintain the all project I do is a documentation as detailed as possible, a code style and order thoughout the entire project as well as a good and strong typing, which again servers as a good documentation therefor as an important tool to lift up newcomers into a project.

A simple componentizatin was applied in order to bring some independency and code separation. But no dummy component where created considering that is was too small and too early, in my view, to decide which component shoul hold more or less logic or be reused and all these things that comes into play when deciding such things.

### **About the Project**

The decision of not using any _css library_ was simply cause my my forte never was making things pretty, I can do that if needed, but it takes me a little more time than the avarage. So considering that I new I head already too little time and some things would certainly be cutted of, why to bother with something that would give me results bellow the avarage? 🤔

Again _error treatment_ became kinda underestimated, some popups or snakbars system would come in heady for a proper feedback for the user in error and even some sucsess cases. but, you know... resources are limited, you gotta make tough choices 🤷‍.

**NOTE**: all of this in my opinion, that obviously is not solemn nor immutable truths. In fact I'm anxious to know what you guys think about it 🤩
