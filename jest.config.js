module.exports = {
   // źródła testów
   roots: ["<rootDir>/src"],
     type: "commonjs", // Dodaj tę linię do konfiguracji

   // transformacja plików TSX za pomocą Babela
   transform: {
     "^.+\\.tsx?$": "babel-jest",
   },
   // zezwalaj na importowanie plików graficznych itp.
   moduleNameMapper: {
     "\\.(css|less|sass|scss)$": "identity-obj-proxy",
     "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/__mocks__/fileMock.js",
   },
   // Moduły które mają być testowane
   moduleFileExtensions: ["tsx", "ts", "js"],
   // Ustawienia dla środowiska testowego
   testEnvironment: "jsdom",
   // Ignoruj pliki z katalogu 'node_modules'
   modulePathIgnorePatterns: ["<rootDir>/build/"],
 };
 