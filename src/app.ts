import {Game} from "./Game.js";
import {UIManager} from "./UIManager.js";
import {defaultConfig as config} from "./config/defaultConfig.js";

const ui: UIManager = new UIManager(config);
const game: Game = new Game(ui, config);
game.init(config);
ui.startGame(game, config);
