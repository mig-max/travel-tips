import { Button } from "semantic-ui-react"
function About () {

    return (
        <div className="about">
            <h1>About this project</h1>
            <p>This project was created as part of the Ironhack full-stack web development bootcamp.
            <br />
            The porject consist in building a React application and integrating it with either our own mock backend or an external API.
            </p>
            <br />
            <h2>Requirements</h2>
            <p>
            Create a Single Page Application (SPA), using React, consisting of multiple views. The React application should be integrated with either a mock backend or an external API and should perform all CRUD (Create, Read, Update, Delete) operations on that API. The app should be responsive. 
            </p>
            <h3>Miguel Chito</h3>
            
            <a href="https://github.com/donxito"><Button>Github</Button></a>
            <a href="XXXXXXXXXXX"><Button>LinkedIn</Button></a>
            

            <h3>Max XXXXXXX</h3>

            <a href="https://github.com/Logrance"><Button>Github</Button></a>
            <a href="XXXXXXX"><Button>LinkedIn</Button></a>
            
           


        </div>


    )
}


export default About;