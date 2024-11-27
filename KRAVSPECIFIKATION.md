## **Kravanalys för Mat- och Måltidsapplikation**

### **1. Syfte och mål**

Applikationen ska hjälpa användare att hantera recept, måltidsplanering och ingredienslistor. Den ska vara enkel att använda i en konsolmiljö till en början, och byggas med TypeScript för att säkerställa typkontroll och skalbarhet.

---

### **2. Funktionella krav**

#### **2.1 Hantering av recept**

- **Prio**:

  - Användaren ska kunna lägga till nya recept.
  - Användaren ska kunna lista alla recept.
  - Användaren ska kunna ta bort recept baserat på namn.

- **Senare**:
  - Användaren ska kunna söka efter recept baserat på ingredienser.

#### **2.2 Måltidsplanering**

- **Prio**:

  - Användaren ska kunna planera måltider för en dag.
  - Användaren ska kunna koppla måltider till recept.
  - Användaren ska kunna se näringsvärden för dagen

- **Senare**:
  - Användaren ska kunna skapa veckoplanering.

#### **2.3 Ingredienshantering**

- **Prio**:

  - Användaren ska kunna lägga till livsmedel
  - Användaren ska kunna söka efter livsmedel
  - Användaren ska kunna ändra livsmedel
  - Användaren ska kunna ta bort livsmedel

- **Senare**:
  - Applikationen ska varna om en ingrediens håller på att ta slut.
  - Användaren ska kunna visa en lista över ingredienser hemma.
  - Användaren ska kunna uppdatera mängder på ingredienser (t.ex. minska vid användning).

#### **2.4 Shoppinglista**

- **Priov**:

  - Applikationen ska kunna generera en lista med ingredienser som behövs för flera dagar

- **Senare**:
  - Användaren ska kunna exportera shoppinglistan till en fil.

#### **2.5 Kalorikalkylator**

- **Prio**:

  - Applikationen ska beräkna det totala kaloriinnehållet i en måltid baserat på receptens ingredienser.
  - Applikationen ska beräkna det totala kaloriinehållet över en dag
  - Applikationen ska beräkna det totala kaloriinehållet över en vecka

- **Senare**:
  - Användaren ska kunna lägga till egna kaloriuppgifter för ingredienser.

#### **2.6 Export och import**

- **Prio**:

  - Användaren ska kunna exportera och importera recept och måltidsplaner som JSON-filer.

- **Senare**:
  - Applikationen ska stödja import/export av data i andra format, t.ex. CSV.

---

### **3. Icke-funktionella krav**

#### **3.1 Användarvänlighet**

- Applikationen ska ha en enkel och tydlig menystruktur för konsolinteraktion.
- Felmeddelanden ska vara informativa och tydliga.

#### **3.2 Prestanda**

- Applikationen ska kunna hantera minst 100 recept utan att prestandan påverkas märkbart.

#### **3.3 Skalbarhet**

- Applikationen ska vara modulär för att enkelt kunna utökas med fler funktioner i framtiden.

#### **3.4 Robusthet**

- Applikationen ska hantera ogiltiga inmatningar utan att krascha.
- Data ska sparas och laddas korrekt mellan sessioner.

#### **3.5 Tekniska krav**

- Applikationen ska byggas på:
  - Javascript
  - TypeScript
  - Jest
  - Coverage (Istanbul)
- När ett web gräsnsnitt ska skapas, ska React, Next.js och Tailwind användas

---

### **4. Begränsningar**

- Applikationen kommer endast att fungera i en konsolmiljö initialt.
- Ingen integration med externa API:er för ingrediensdata eller kalorikalkylering (kan läggas till i framtiden).
- Ingen grafisk användargränssnitt (GUI) i denna fas.

---

### **5. Målgrupp**

- Personer som vill planera och organisera sina måltider.
- Användare som föredrar en minimalistisk lösning utan krångliga gränssnitt.

---

### **6. Projektmål**

- En första fungerande version ska vara klar med grundläggande recept- och måltidsfunktioner.
- Utvecklingen ska följa Test Driven Development (TDD).
- Kodtäckningen ska vara nära 100%.

---

### **7. Milstolpar**

1. **Milstolpe 1**: Grundläggande funktionalitet

   - Lägg till, lista och ta bort recept.
   - Enkel menystruktur i konsolen.

2. **Milstolpe 2**: Måltidsplanering

   - Skapa och visa måltider för en dag.

3. **Milstolpe 3**: Ingredienshantering och shoppinglista

   - Håll koll på ingredienser och generera shoppinglistor.

4. **Milstolpe 4**: Tester och kodtäckning

   - Skriva tester för alla funktioner.
   - Mäta och förbättra kodtäckningen.

5. **Milstolpe 5**: Export och import
   - Exportera och importera recept och planer.

---

### **Nästa steg**

- Skapa en grundstruktur och definiera menyer i konsolen.
- Implementera och testa funktionaliteten steg för steg med TDD.
