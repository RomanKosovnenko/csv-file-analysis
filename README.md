# csv-file-analysis

This repository created to solve a test task below:


## Ziel:

Es soll eine Anwendung erstellt werden, die Daten aus einer CSV-Datei analysiert und HTTP-Endpunkte bereitstellt, um Statistiken und Visualisierungen abzufragen. Die Anwendung soll in einem Docker-Container laufen.


## Aufgabe:

Datenanalyse und http-Endpunkte mit TypeScript oder JavaScript.

1. Datenbereitstellung
   *  Eine CSV-Datei mit dem Namen data.csv enthält folgende Spalten:
      * ID (integer)
      * Name (string)
      * Age (integer)
      * Salary (float)
   * Vorzugsweise soll eine eigene CSV-Datei mit einem anderen Beispiel erstellt werden, gerne auch aus einer öffentlich zugänglichen Statistik-Datenbank (z.B. genesis-online).
2. Anwendungsanforderungen
   * Implementiere die Anwendung in TypeScript oder JavaScript.
   * Um HTTP-Endpunkte bereitzustellen soll ein Framework (z.B. Express, Fastify) verwendet werden.
   * Die Anwendung soll folgende Funktionen bereitstellen:
     * Statistik-Endpunkt:
       * Gibt mindestens 3 statistische Auswertungen als JSON zurück (abhängig vom Datensatz):
         * z.B. Durchschnittliches Alter, Durchschnittsgehalt, Anzahl der Personen unter 30 Jahren
     * Visualisierungs-Endpunkt:
       * Erstellt ein Balkendiagramm, zu selbstgewählten statistischen Auswertungen
         * z.B. das die Anzahl der Personen in verschiedenen Altersgruppen (<30, 30-50, >50) zeigt.
       * Gibt das Diagramm als PNG-Datei zurück.
3. Containerisierung
   * Erstelle ein Docker-Image mit den folgenden Anforderungen:
     * Alle Abhängigkeiten der Anwendung sollen installiert sein.
     * Die Anwendung muss beim Start des Containers automatisch ausgeführt werden.
     * Die CSV-Datei data.csv soll als Eingabe verwendet werden und im Container verfügbar sein.
4. Zusätzliche Anforderungen (Optional):
   * Füge einen weiteren Endpunkt hinzu, der es ermöglicht, die CSV-Datei durch eine hochgeladene Datei zu ersetzen.

