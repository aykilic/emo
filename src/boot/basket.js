export default function({ store, route, redirect, req }) {
    // console.log(process.client)
    // console.log(process.server)
    if (process.client) {
      console.log("seesion-auth-1")
    } else {
      console.log("seesion-auth-2")
    }
  }