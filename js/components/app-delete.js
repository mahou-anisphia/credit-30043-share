// app-deldata  component
const DelData = {
  template: `
  <v-row>
		<v-col cols="12" md="6 ">

			<v-card class="mx-auto" max-width="90%">
				<v-card-text>
					<v-form>
						<v-text-field label="Unit code" v-model="code" />
						</v-text-field>
						<v-btn depressed v-on:click="delData(code)" color="primary">Delete</v-btn>
					</v-form>
				</v-card-text>
			</v-card>

		</v-col>
		<!-- Output -->
		<v-col cols="12" md="6">
			<v-card class="mx-auto" max-width="90%">
				<v-card-text>

					<!-- Output -->
					<p>Output Message : {{msg}}</p>
					<p>Status Code: {{statusVal}}</p>
					<p>Status: {{statusText}}</p>
					<p>Response Headers: {{headers}}</p>
				</v-card-text>
			</v-card>
		</v-col>
	</v-row>
           `,
  // Assuming you have already included Axios in your project through a script tag as shown before.

  data: function () {
    return {
      code: "",
      msg: "",
      statusVal: "",
      statusText: "",
      headers: "",
    };
  },

  methods: {
    delData: function (cd) {
      var delSQLApiURL = "resources/apis.php/code/" + cd;
      var self = this;

      // Axios DELETE request with error handling
      axios
        .delete(delSQLApiURL, {
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            code: cd,
          },
        })
        .then((response) => {
          // Handle the response data here
          self.msg = "Data deleted Successfully";
        })
        .catch((error) => {
          // Handle the error here
          self.msg = "There was an error!";
          self.statusText = error;
        });
    },
  },
};
