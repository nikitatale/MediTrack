



export const getMedicineInfo = async (req, res) => {
  try {
    const { medicineName } = req.body;

    if (!medicineName) {
      return res.status(400).json({ message: "medicineName is required" });
    }

    const prompt = `Give a short, simple explanation (max 100 words) of the medicine "${medicineName}" covering: common uses, typical side effects, and one key precaution. Keep it beginner-friendly, not overly clinical.`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.LLM_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 200,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.log("Groq API response:", JSON.stringify(data, null, 2));
      return res.status(500).json({ message: "LLM API error", details: data });
    }

    const info = data.choices?.[0]?.message?.content || "No information available.";

    res.json({ medicineName, info });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




export const parsePrescription = async (req, res) => {
  try {
    const { extractedText } = req.body;
    if (!extractedText) {
      return res.status(400).json({ message: "extractedText is required" });
    }

    const prompt = `You are extracting medicine details from OCR text of a prescription. The text may be messy or have OCR errors. Extract each medicine mentioned and return ONLY a valid JSON array (no markdown, no explanation), in this exact format:
[
  {
    "name": "medicine name",
    "dosage": "e.g. 500mg",
    "frequency": "e.g. twice a day",
    "timings": ["09:00", "21:00"],
    "durationDays": 7
  }
]
If timings aren't explicitly mentioned, infer reasonable times based on frequency (once a day -> ["09:00"], twice a day -> ["09:00","21:00"], thrice a day -> ["09:00","14:00","21:00"]). If durationDays isn't mentioned, default to 7. If you cannot find any medicines, return an empty array [].

OCR text:
"""${extractedText}"""`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.LLM_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 500,
        temperature: 0.2,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.log("Groq parse-prescription error:", JSON.stringify(data, null, 2));
      return res.status(500).json({ message: "LLM API error", details: data });
    }

    let rawText = data.choices?.[0]?.message?.content || "[]";
   
    rawText = rawText.replace(/```json|```/g, "").trim();

    let medicines;
    try {
      medicines = JSON.parse(rawText);
    } catch (parseErr) {
      return res.status(500).json({ message: "Could not parse LLM response into JSON", raw: rawText });
    }

    res.json({ medicines });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};