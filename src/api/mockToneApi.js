import delay from './delay';

const tone = 
  {
    "document_tone": {
      "tone_categories": [
        {
          "tones": [
            {
              "score": 0.97788,
              "tone_id": "anger",
              "tone_name": "Anger"
            },
            {
              "score": 0.12229,
              "tone_id": "disgust",
              "tone_name": "Disgust"
            },
            {
              "score": 0.679062,
              "tone_id": "fear",
              "tone_name": "Fear"
            },
            {
              "score": 0.033315,
              "tone_id": "joy",
              "tone_name": "Joy"
            },
            {
              "score": 0.059578,
              "tone_id": "sadness",
              "tone_name": "Sadness"
            }
          ],
          "category_id": "emotion_tone",
          "category_name": "Emotion Tone"
        },
        {
          "tones": [
            {
              "score": 0.253,
              "tone_id": "analytical",
              "tone_name": "Analytical"
            },
            {
              "score": 0,
              "tone_id": "confident",
              "tone_name": "Confident"
            },
            {
              "score": 0.626,
              "tone_id": "tentative",
              "tone_name": "Tentative"
            }
          ],
          "category_id": "language_tone",
          "category_name": "Language Tone"
        },
        {
          "tones": [
            {
              "score": 0.038,
              "tone_id": "openness_big5",
              "tone_name": "Openness"
            },
            {
              "score": 0.061,
              "tone_id": "conscientiousness_big5",
              "tone_name": "Conscientiousness"
            },
            {
              "score": 0.909,
              "tone_id": "extraversion_big5",
              "tone_name": "Extraversion"
            },
            {
              "score": 0.741,
              "tone_id": "agreeableness_big5",
              "tone_name": "Agreeableness"
            },
            {
              "score": 0.821,
              "tone_id": "emotional_range_big5",
              "tone_name": "Emotional Range"
            }
          ],
          "category_id": "social_tone",
          "category_name": "Social Tone"
        }
      ]
    }
  }


class mockToneApi {
  static getTone(articles) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(Object.assign({}, tone));
      }, delay);
    });
  }
}

export default mockToneApi;

