// app-readmysql component
const ReadMysql = {
  // define the template for the component
  template: `
  <v-row>

    <v-col cols="12" md="12 " >

    <v-card
       class="mx-auto"
       max-width="90%"
       >

       <v-card-title>
        <h2> Units </h2>
       </v-card-title>

       <v-card-text>
            <div class="table-responsive">
                <table class="table table-striped table-hover table-layout-fixed">
                    <thead>
                        <tr>
                            <th> Code </th>
                            <th> Description </th>
                            <th> CP </th>
                            <th> Type </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="u in getItems">
                            <td> {{ u.code }} </td>
                            <td> {{ u.description }} </td>
                            <td> {{ u.cp }}</td>
                            <td> {{ u.type }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </v-card-text>
        </v-card>
        </v-col>

        <v-col cols="12" md="12">
          <paginate
            :page-count=getPageCount
            :page-range="3"
            :margin-pages="1"
            :click-handler="clickCallback"
            :prev-text=" 'Prev' "
            :next-text="'Next'"
            :container-class="'pagination'"
            :page-class="'page-item'"
            :active-class="'currentPage'">
          </paginate>
        </v-col>
     </v-row>
   `,
  // variable initialization

  data: function () {
    return {
      perPage: 5,
      currentPage: 1,
      units: [],
      errorMessage: "", // Add errorMessage to handle potential errors.
    };
  },
  components: {
    paginate: VuejsPaginateNext,
  },
  computed: {
    // returns the data according to the page number
    getItems: function () {
      let current = this.currentPage * this.perPage;
      let start = current - this.perPage;
      return this.units.slice(start, current);
    },
    //returns total number of pages required according to the total rows of data
    getPageCount: function () {
      return Math.ceil(this.units.length / this.perPage);
    },
  },
  methods: {
    //sets the clicked page
    clickCallback: function (pageNum) {
      this.currentPage = Number(pageNum);
    },
    fetchData: function () {
      var self = this;
      var readSQLApiURL = "resources/apis.php/"; //define URL for the API

      // Axios GET request with error handling
      axios
        .get(readSQLApiURL)
        .then((response) => {
          // Handle the response data here
          self.units = response.data;
        })
        .catch((error) => {
          // Handle the error here
          self.errorMessage = error;
        });
    },
  },
  created() {
    this.fetchData(); // Call the fetchData method to initiate the API request.
  },
};
