<template>
  <div>
    <h1 class="title" align= "center">Search Page</h1>
    <div v-if="searchAtribute=='player'">
      <b-input-group prepend="Search Query:" id="search-input">
        <div>
          <b-form-input list="players"></b-form-input>
          <datalist id="players">
            <option>Peter Ankersen</option>
            <option v-for="p in playersList" :key="p">{{ p }}</option>
          </datalist>
        </div>
        <template #append>
          <b-dropdown v-bind:text="searchAtribute" variant="success">
            <b-dropdown-item @click="playerSearch()">Player</b-dropdown-item>
            <b-dropdown-item @click="teamSearch()">Team</b-dropdown-item>
          </b-dropdown>
        </template>
      </b-input-group>
      <b-input-group prepend="Search Team:" id="search-input">
        <div>
          <b-form-input list="teams"></b-form-input>
          <datalist id="teams">
            <option>AaB</option>
            <option v-for="t in teamsList" :key="t">{{ t }}</option>
          </datalist>
        </div>
      </b-input-group>
      <b-input-group prepend="Search Location:" id="search-input">
        <div>
          <b-form-input list="Locations"></b-form-input>
          <datalist id="Locations">
            <option>Peter Ankersen</option>
            <option v-for="L in LocationsList" :key="L">{{ L }}</option>
          </datalist>
        </div>
      </b-input-group> -->
    </div>
    <b-input-group prepend="Search Query:" id="search-input" v-else>
      <div>
        <b-form-input list="teams"></b-form-input>
        <datalist id="teams">
          <option>Peter Ankersen</option>
          <option v-for="t in teamsList" :key="t">{{ t }}</option>
        </datalist>
      </div>
      <template #append>
        <b-dropdown v-bind:text="searchAtribute" variant="success">
          <b-dropdown-item @click="playerSearch()">Player</b-dropdown-item>
          <b-dropdown-item @click="teamSearch()">Team</b-dropdown-item>
        </b-dropdown>
      </template>
    </b-input-group>

    <b-input-group-append id="SeachBotton">
      <b-button @click="search()" variant="success">Search</b-button>
    </b-input-group-append>
    <playersShow id="playerslayout"
      v-for="p in players"
      :PlayerID="p.PlayerID" 
      :common_name="p.common_name"
      :fullname="p.fullname"
      :nationality="p.nationality"
      :birthdate="p.birthdate"
      :birthplace="p.birthplace"
      :height="p.height"
      :weight="p.weight"
      :playerPosition="p.playerPosition"
      :PositionID="p.position_id" 
      :teamName="p.team"
      :teamID="p.team_id"
      :photoPath="p.image_path" 
      :key="p.PlayerID"></playersShow>
  </div>
</template>


<script>
import playersShow from "../components/PlayerShow.vue";
// import teamsShow from "../components/FavoriteTeams.vue";

export default {
 data() {
    return {
      searchQuery:"",
      playersList: [
  "Sten Grytebust",
  "Karl-Johan Johnsson",
  "Stephan Andersen",
  "Karlo Bartolec",
  "Andreas Bjelland",
  "Nicolai Boilesen",
  "Victor Nelsson",
  "Bryan Oviedo",
  "Mohammed Daramy",
  "Rasmus Falk Jensen",
  "Viktor Fischer",
  "Zeca",
  "Pep Biel",
  "Jens Stage",
  "Nicolaj Thomsen",
  "Mikkel Kaufmann",
  "Jonas Older Wind",
  "Marios Oikonomou",
  "Kamil Wilczek",
  "Peter Ankersen",
  "Zanka",
  "Rasmus Højlund",
  "Marko Stamenic",
  "Victor Kristansen",
  "Lukas Lerager",
  "Mustapha Bundu",
  "William Vick",
  "Matej Delač",
  null,
  "Rune Frantsen",
  "J. Gomez",
  "Magnus Jensen",
  "Malte Kiilerich",
  "Alexander Ludwig",
  "Mathias Madsen",
  "Peter Nymann",
  "Jonas Gemmer",
  "Hallur Hansson",
  "Bjarke Jacobsen",
  "Louka Prip",
  "Jonas Thorsen",
  "Nicolai Brock-Madsen",
  "Jannik Pohl",
  "Andreas Skjøtt Foged",
  "Jacob Buus Jacobsen",
  "David Kjær Kruse",
  "Casper Tengstedt",
  "Lirim Qamili",
  "Ágúst Hlynsson",
  "Muamer Brajanac",
  "Nicolas Dyhr",
  "Aleksandar Stankovic",
  "Soren Reese",
  "Mads Hermansen",
  "Marvin Schwäbe",
  "Michael Tornes",
  "Hjörtur Hermannsson",
  "Anthony Jung",
  "Joel Kabongo",
  "Andreas Maxsø",
  "Sigurd Rosted",
  "Peter Bjur",
  "Tobias Borchgrevink Borkeeiet",
  "Rezan Corlu",
  "Morten Wetche Frendrup",
  "Simon Hedlund",
  "Jesper Lindstrom",
  "Josip Radošević",
  "Anis Slimane",
  "Lasse Vigen Christensen",
  "Andreas Bruus",
  "Mathias Kvistgaarden",
  "Kevin Mensah",
  "Mikael Uhre",
  "Andrija Pavlović",
  "Blás Riveros",
  "Michael Lumb",
  "Oskar Fallenius",
  "Jonathan Ægidius",
  "Lawrence Thomas",
  "Stefan Gartenmann",
  "Pierre Kanstrup",
  "Jeppe Simonsen",
  "Mads Winther",
  "Julius Eskesen",
  "Mads Hansen",
  "Jannick Liburd",
  "Victor Ekani",
  "Rasmus Hjorth Vinderslev",
  "Mads Albaek",
  "Peter Buch Christiansen",
  "Rilwan Hassan",
  "Anders Jacobsen",
  "Nikolai Flø",
  "Marc Dal Hende",
  "Patrick Banggaard",
  "Emil Frederiksen",
  "Roni Arabaci",
  "Haji Wright",
  "Philipp Schmiedl",
  "Bard Finne",
  "Emil Holm",
  "Adama Guira",
  "Mikkel Andersen",
  "Jesper Hansen",
  "Oliver Ottesen",
  "Joel Andersson",
  "Dion Cools",
  "Paulinho",
  "Alexander Scholz",
  "Japhet Sery",
  "Erik Sviatchenko",
  "Mikael Anderson",
  "Jens Cajuste",
  "Evander",
  "Frank Onyeka",
  "Nicolas Madsen",
  "Awer Mabil",
  "Chuma Anene",
  "Júnior Brumado",
  "Anders Dreyer",
  "Gustav Isaksen",
  "Sory Kaba",
  "Lasse Vibe",
  "Pione Sisto",
  "Kristian Riis",
  "Oliver Olsen",
  "Doguhan Simsir",
  "Luca Pfeiffer",
  "Daniel Høegh",
  "Valdemar Thorsen",
  "Henry Uzochokwu",
  "Jibril Abubakar",
  "Jonas Lössl",
  "Ailton",
  "H. Bility",
  "Mads Kristian Hansen",
  "Kristoffer Hansen",
  "Andreas Hansen",
  "Jacob Rinne",
  "Jakob Ahlmann Nielsen",
  "Lukas Klitten",
  "Kristoffer Pallesen",
  "Mathias Ross Jensen",
  "Rasmus Thelander",
  "Lucas Andersen",
  "Frederik Borsting",
  "Magnus Christensen",
  "Iver Fossum",
  "Malthe Hojholt",
  "Robert Kakeeto",
  "Kasper Kusk",
  "Oliver Klitten",
  "Tom Van Weert",
  "Daniel Granli",
  "V. Prijović",
  "Pedro Ferreira",
  "Tim Prica",
  "Timothee Nkada",
  "Oscar Hiljemark",
  "M. Serup Hannesbo",
  "Martin Samuelsen",
  "Rufo Herraiz",
  "Hans Christian Bernat",
  "Oliver Christensen",
  "Mande Sayouba",
  "Alexander Juel Andersen",
  "Ryan Laursen",
  "Kasper Larsen",
  "Oliver Lund",
  "Jørgen Skjelvik",
  "Jeppe Tverskov",
  "Christian Vestergaard",
  "Janus Drachmann",
  "Mads Frokjaer-Jensen",
  "T. Ibrahimagic",
  "Troels Kløve",
  "Moses Opondo",
  "Jens Thomasen",
  "Aron Elís Thrándarson",
  "M. Fenger",
  "M. Hyllegaard",
  "Issam Jebali",
  "Mart Lieder",
  null,
  "Emmanuel Sabbi",
  "Sveinn Aron Guðjohnsen",
  "Ayo Simon Okosun",
  "Sander Svendsen",
  "R. Østrøm",
  "M. Brems",
  "Bashkim Kadrii",
  "Jonathan Khemdee",
  "Patrik Carlgren",
  "Jonas Dakir",
  "Jesper Lauridsen",
  "Simon Graves Jensen",
  "Bjorn Kopplin",
  "Erik Marxen",
  "Mathias Aaris Kragh Nielsen",
  "Mathias Greve",
  "Vito Hammershøj-Mistrati",
  "Mikkel Kallesøe",
  "Tobias Klysner Breuner",
  "Oliver Bundgaard  Kristensen",
  "Frederik Lauenborg",
  "Simon Piesinger",
  "Marvin Egho",
  "Alhaji Kamara",
  "Tosin Kehinde",
  "Karl Dreier Leth",
  "Christoffer Petersen",
  "Mads Enggård",
  "Bassala Sambou",
  "Nikola Mileusnić",
  null,
  "F. Kristensen",
  "Kasper Hogh",
  "Lasser Berg Johnsen",
  "Peter Vindahl Jensen",
  "Kian Hansen",
  "Ivan Mesik",
  "Mads Thychosen",
  "Oliver Marc Rose-Villadsen",
  "Maxwell Woledzi",
  "Ulrik Jenssen",
  "Magnus Kofod Andersen",
  "Oliver Antman",
  "Jacob Christensen",
  "Tochi Chukwuani",
  "M. Diomande",
  "Abu Francis",
  "Martin Frese",
  "Jonathan Amon",
  "Andreas Bredahl",
  "Joachim Juhl Rothmann",
  "Ibrahim Sadiq",
  "K. Sulemana",
  "Martin Vantruba",
  "Oliver Rimmen",
  "Chukwuemeka Paul Nnamani",
  "Johan Djourou",
  "D. Svensson",
  "Lucas Lykkegaard",
  "Andreas Pedersen",
  "Victor Jensen",
  "Andreas Schjelderup",
  "Simon Adingra",
  "Adamo Nagalo",
  "Jonas Jensen-Abbew",
  "Frederik Agust Schram",
  "Thomas Mikkelsen",
  "Kasper Enghardt",
  "Lasse Fosgaard",
  "Pascal Gregor",
  "Mathias Hebo Rasmussen",
  "Filip Panjeskovic",
  "Adam Sorensen",
  "Kevin Ngoyi Tshiembe",
  "Frederik Franck Winther",
  "Marcel Rømer",
  "Emil Nielsen",
  "Magnus Warming",
  "Brian Hamalainen",
  "Rasmus Thellufsen",
  "Christian Jakobsen",
  "Victor Torp Overgaard",
  "Frederik Gytkjær",
  "Korving Emil",
  "Jens Martin Gammelby",
  "Willads Delvin",
  "Lucas Ørneborg",
  "Casper Kaarsbo Winther",
  "Lauge Sandgrav",
  "Svenn Crone",
  "Kasper Jorgensen",
  "Magnus Kaastrup Larsen",
  "Justin Shaibu",
  "Daniel Gadegaard Andersen",
  "William Eskelinen",
  "Magnus Anbo",
  "Niklas Backman",
  "Alex Gersbach",
  "Sebastian Lund Hausner",
  "Casper Højer",
  "Jesper Juelsgaard",
  "Alexander Munksgaard",
  "Frederik Tingager",
  "Bror Blume Jensen",
  "Zach Duncan",
  "A. Erlykke",
  "Benjamin Hvidt",
  "Milan Jevtović",
  "Gift Links",
  "Nicolai Poulsen",
  "Jón Dagur Þórsteinsson",
  "Patrick Mortensen",
  "Søren Tengstedt",
  "Kevin Diks",
  "Patrick Olsen",
  "Thomas Kristensen",
  "Kamil Grabara",
  "Alexander Ballegaard Ammitzboll",
  "Mathias Jørgensen",
  "Bubacarr Sanneh",
  "Daniel Arzani",
  "Lucas Chang Anderson",
  "Indy Groothuizen",
  "Viljormur Davidsen",
  "Tobias Henriksen",
  "Mads Greve",
  "Juhani Ojala",
  "Thomas Gundelund Nielsen",
  "Lundrim Hetemi",
  "Diego Montiel",
  "Arbnor Mucolli",
  "Ylber Ramadani",
  "Jacob Schoop",
  "Wahidullah Faghir",
  "Alan Sousa",
  "Lucas Jensen",
  "Alexander Brunst",
  "Matthew Briggs",
  "Saeid Ezatolahi",
  "Kevin Yamga",
  "Denis Kolinger",
  "Dominik Kovačić",
  "T. Sommer",
  "Adama Fofana",
  "Foday Manneh",
  "Pierre Bengtsson",
  "Lukas Engel",
  "Ivan Repyakh",
  "German Onugkha",
  "Hugo Ekitike"
],
      teamsList: ["livarpool","united"],
      LocationsList: ["defender","Attack"],
      searchAtribute: "player",
      searchTeam: '',
      searchLocation: '',
      teams: [],
      players: []
    };
  },
  components:{
    playersShow,
    // teamsShow
  },
  methods: {
    playerSearch(){this.searchAtribute='player'},
    teamSearch(){this.searchAtribute='team'},
    async getAutoCompleteData(){
      try{
        console.log("enter get aouto complete data");
        const searchAutoComlateData = await this.axios.get(
          "http://localhost:3000/league/getSeachOutoCompleteData"
        );
        console.log("recived data");
        this.playersList = searchAutoComlateData.playersNames;
        this.teamsList = searchAutoComlateData.teamsNames;
        this.LocationsList = searchAutoComlateData.positions;
      }catch(error){
        console.log("error in getting aouto complete search data");
        console.log(error);
      }
    },
    async search(){
      this.players = []
      this.teams =[]
      console.log("start searching");
      console.log({
        searchQuery: this.searchAtribute,
        search_query: this.searchQuery,
        searchTeam: this.searchTeam,
        searchLocation: this.searchLocation
      })
      if(this.searchAtribute == 'player'){
        try {
          if(this.searchTeam == ''){this.searchTeam =`{team}`};
          if(this.searchLocation==''){this.searchLocation = `{location}`};
          const response = await this.axios.get(
            `http://localhost:3000/players/search/locationAndTeam/${this.searchQuery}/${this.searchTeam}/${this.searchLocation}`,
          );
          console.log(response);
          this.showPlayers(response);
          if(this.searchTeam ==`{team}`){this.searchTeam =''};
          if(this.searchLocation== `{location}`){this.searchLocation =''};
        } catch (error) {
          console.log("error in search keyword player")
          console.log(error);
        }
      }else{
        try {
          const response = await this.axios.get(
            `http://localhost:3000/teams/search/${this.searchQuery}`,
          );
          console.log(response);

        } catch (error) {
          console.log("error in search keyword team")
          console.log(error);
        }
      }

    },
    async showteams(data){
      const teams = data.data;
        this.teams = [];
        this.teams.push(...teams);
    },
    async showPlayers(data){
      const players = data.data;
        this.players = [];
        this.players.push(...players);
    }
  },
mounted() {
  console.log("enter search page");
  // this.getAutoCompleteData();
},
}
</script>

<style scoped>

#search-input {
  margin-left: 25%; 
  width: 500px; 
  margin-top: 20px;
}

#SeachBotton {
  margin-top: 20px;
  margin-left: 50%;
  width: 500px; 
}

#playerslayout{
  /* margin-top: 20px; */
  /* display: flex; */


}
</style>