"This script uses Online_Courses.csv to populate src/data/Courses.ts as a one-time preprocessing step."
LIMIT = 15

import pandas as pd
import numpy as np
df = pd.read_csv("Online_Courses.csv", nrows=LIMIT)

fileText = """import { CourseData } from "@/types/Course";

export const coursesData: CourseData = {
"""

for idx, row in df.iterrows():
    courseCode = "".join(word[0] for word in row.Title.split(" ") if word[0].isalnum()) + f"{idx}"
    fileText += f"""  {courseCode}: {{
    courseCode: "{courseCode}",
    title: "{row.Title}",
    instructors: "{", ".join(name for name in row.Instructors.split(" ,") if name != "")}",
    language: "{row.Language}",
    duration: "{"".join(word[0] for word in row.Duration if word.isnumeric()) + " months"}",
    fee: {np.random.randint(25, 75)*100},
    rating: "{"".join(c for c in row.Rating if (c.isnumeric() or c == "."))}",
    description: "{row["Short Intro"]}",
    skills: {row.Skills.split(", ")},
    subject: "{row.Category}",
    category: "{row.Category + "/" + row["Sub-Category"]}",
    enrollURL: "{row.URL}",
  }},
"""

fileText += "};"
with open("../src/data/Courses.ts", "w") as f:
    f.write(fileText)