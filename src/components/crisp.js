import React, { Component } from "react";

import { Crisp } from "crisp-sdk-web";

class CrispChat extends Component {
  componentDidMount() {
    Crisp.configure("76bde946-6f2f-4372-88a3-a579f8f733d7");
  }

  render() {
    return null;
  }
}
export default CrispChat;
