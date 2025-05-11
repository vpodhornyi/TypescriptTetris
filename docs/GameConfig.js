export var GameConfig;
(function (GameConfig) {
    GameConfig[GameConfig["START_SCORE"] = 0] = "START_SCORE";
    GameConfig[GameConfig["START_LEVEL"] = 1] = "START_LEVEL";
    GameConfig[GameConfig["START_SPEED"] = 1000] = "START_SPEED";
    GameConfig[GameConfig["SCORE_STEP"] = 100] = "SCORE_STEP";
    GameConfig[GameConfig["SPEED_STEP"] = 25] = "SPEED_STEP";
    GameConfig[GameConfig["LEVEL_STEP"] = 1] = "LEVEL_STEP";
    GameConfig[GameConfig["SCORE_LEVEL_INCREASE"] = 500] = "SCORE_LEVEL_INCREASE";
    GameConfig[GameConfig["MAIN_FIELD_ROWS"] = 20] = "MAIN_FIELD_ROWS";
    GameConfig[GameConfig["MAIN_FIELD_COLUMNS"] = 10] = "MAIN_FIELD_COLUMNS";
    GameConfig[GameConfig["EXTRA_FIELD_ROWS"] = 6] = "EXTRA_FIELD_ROWS";
    GameConfig[GameConfig["EXTRA_FIELD_COLUMNS"] = 6] = "EXTRA_FIELD_COLUMNS";
    GameConfig["CELLS_SELECTOR_MAIN"] = "#main_field div";
    GameConfig["CELLS_SELECTOR_EXTRA"] = "#extra_field div";
})(GameConfig || (GameConfig = {}));
