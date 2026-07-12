// Simple fetch-based call to an LLM API (OpenAI-compatible).
// No ML knowledge needed - this is just an HTTP request like any other API call.

// @route POST /api/llm/medicine-info
// body: { medicineName }

export const getMedicineInfo = async (req, res) => {
  try {
    const { medicineName } = req.body;

    if (!medicineName) {
      return res
        .status(400)
        .json({ message: "medicineName is required" });
    }

    const prompt = `Give a short, simple explanation (max 100 words) of the medicine "${medicineName}" covering: common uses, typical side effects, and one key precaution. Keep it beginner-friendly, not overly clinical.`;

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.LLM_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          max_tokens: 200,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({
        message: "LLM API error",
        details: data,
      });
    }

    const info =
      data.choices?.[0]?.message?.content ||
      "No information available.";

    res.json({
      medicineName,
      info,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};