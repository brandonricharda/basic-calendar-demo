import React, { Component } from "react";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title : "",
            duration : "",
            type : "online",
            division : "https://api.oncallhealth.ca/divisions/2404/",
            participants : [{
                "email": "",
                "name": "",
                "fee": 0,
                "cancelled": false
            }],
            datetime : ""
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        if (!target.id.includes("participant")) {
            this.setState({
                [name] : value
            });
        } else {
            const { participants } = { ...this.state };
            const currentState = participants;
            currentState[0][name] = value;
            this.setState({
                participants : currentState
            });
        }
        console.log(this.state);
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        const bodyParams = JSON.stringify(this.state);
        this.createAppointment(bodyParams);
    }

    stringifyUserInput(userInput) {
        userInput.preventDefault();
        console.log(userInput);
    }

    createAppointment(bodyParams) {
        fetch("https://warm-escarpment-84950.herokuapp.com/post-new-appointment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: bodyParams
        })
        .then(res => res.text())
        .then(res => this.setState({ apiResponse: res }))
        .catch(err => err);
    }

    render() {
        return (
            <div>
                <form className="flex column items-aligned-center" onSubmit={this.handleFormSubmit}>
                    <h2>Create a New OnCall Appointment</h2>
                    <label className="flex column items-aligned-center">
                        <p className="mb-10">Appointment Title:</p>
                        <input
                            name="title"
                            type="text"
                            className="width-350 height-20"
                            onChange={this.handleInputChange}
                        />
                    </label>

                    <label className="flex column items-aligned-center">
                        <p className="mb-10">Appointment Duration (Minutes):</p>
                        <input
                            name="duration"
                            type="number"
                            className="width-350 height-20"
                            onChange={this.handleInputChange}
                        />
                    </label>

                    <label className="flex column items-aligned-center">
                        <p className="mb-10">Your Name (Patient):</p>
                        <input
                            name="name"
                            type="text"
                            className="width-350 height-20"
                            id="participant-name-input"
                            onChange={this.handleInputChange}
                        />
                    </label>

                    <label className="flex column items-aligned-center">
                        <p className="mb-10">Your Email (Patient):</p>
                        <input
                            name="email"
                            type="text"
                            className="width-350 height-20"
                            id="participant-email-input"
                            onChange={this.handleInputChange}
                        />
                    </label>

                    <label className="flex column items-aligned-center">
                        <p className="mb-10">Appointment Type:</p>
                        <select name="type" className="width-350 height-20" onChange={this.handleInputChange}>
                            <option value="online">Online</option>
                            <option value="inperson">In Person</option>
                            <option value="phone">Phone</option>
                            <option value="message">Message</option>
                        </select>
                    </label>

                    <label className="flex column items-aligned-center">
                        <p className="mb-10 mt-10">Appointment Date:</p>
                        <input
                            name="datetime"
                            type="datetime-local"
                            className="width-350 height-20 mb-10"
                            onChange={this.handleInputChange}
                        />
                    </label>

                    <input type="submit" value="Submit" className="width-350 height-30 primary-blue borderless white-text cursor-pointer"/>

                    <div class="flex column width-350 items-aligned-center">
                        <h2>Response:</h2>
                        <p>Note: This application is connected to a free server. It may take a while to generate a response if the server has not been spun up in a while.</p>
                        <p>{this.state.apiResponse}</p>
                    </div>

                </form>

            </div>
        )
    }

}

export default App;
