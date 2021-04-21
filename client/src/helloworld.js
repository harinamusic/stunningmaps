// src/helloworld.js
import Counter from "./counter";
// function component
// "presentational component"/"dumb component" - function components are
// used to just present sth, or render sth onscreen
export default function HelloWorld() {
    const name = "Katharina";
    // JSX - JS that looks like HTML. JSX is JS that describes the UI
    return (
        <div>
            Hello, {name}!
            {/* //name on the left side is the prop that we are passing - 
            //right hand side is the value of the prop and has to be a variable that exists in the component 
            //its convention that the prop and the variable have the same name*/}
            <Counter name={name} />
        </div>
    );
}
