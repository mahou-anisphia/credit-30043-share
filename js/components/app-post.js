// app-postdata component
const PostData = {
  template: `
  <v-row>
    <v-col cols="12" md="6 " >
      <v-card
        class="mx-auto"
        max-width="90%"
        >

        <v-card-text>
          <v-form>
            <v-text-field label="Unit code" v-model="code" /></v-text-field>
            <v-text-field label="Description" v-model="description" /></v-text-field>
            <v-numeric-input v-model="cp" :min="2.5" :max="30" :step="2.5"></vue-numeric-input>
            <label for="cp">Credit points: </label><input id="cp" type="number" min="2.5" max="30" step="2.5" v-model="cp">
            <br>

            <v-radio-group label="Type" v-model="type">
              <v-radio label="Core" value="Core"></v-radio>
              <v-radio label="Software Development" value="Software Development"></v-radio>
              <v-radio label="Systems Analysis" value="Systems Analysis"></v-radio>
            </v-radio-group>


            <v-btn
              depressed
              v-on:click="postData(code, description, cp, type)"
              color="primary">
              Add
            </v-btn>

          </v-form>
        </v-card-text>

      </v-card>

      </v-col >
        <!-- Output -->
          <v-col cols="12"
              md="6">
        <v-card
          class="mx-auto"
          max-width="90%"
          >
          <v-card-text>
            <p>Output Message : {{ msg }}</p>
            <p>Status Code: {{statusVal}}</p>
            <p>Status: {{statusText}}</p>
            <p>Response Headers: {{headers}}</p>
          </v-card-text>
        </v-card>
      </v-col>
</v-row>

   `,

  data: function () {
    return {
      code: "",
      description: "",
      cp: 2.5,
      type: "",
      msg: "",
      imgVar: "",
      statusVal: "",
      statusText: "",
      headers: "",
      savingSuccessful: false,
    };
  },
  methods: {
    postData: function (cd, desc, cred, tp) {
      // Define URL for the API
      var postSQLApiURL = "resources/apis.php/";

      var self = this;

      // Axios POST request with error handling
      axios
        .post(
          postSQLApiURL,
          {
            id: null,
            code: cd,
            description: desc,
            cp: cred,
            type: tp,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          // Handle the response data here
          self.msg = "Data Inserted Successfully.";
        })
        .catch((error) => {
          // Handle the error here
          self.msg = "There was an error! " + error;
        });
    },
  },
};
