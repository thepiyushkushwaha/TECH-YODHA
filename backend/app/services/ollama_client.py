import httpx
import logging
from typing import Dict, Any, Optional
from app.core.config import settings

logger = logging.getLogger("drishti.ollama")

class OllamaClient:
    def __init__(self, base_url: str = settings.OLLAMA_BASE_URL, model: str = settings.OLLAMA_MODEL):
        self.base_url = base_url
        self.model = model

    async def generate_completion(self, prompt: str, system_prompt: Optional[str] = None) -> Optional[str]:
        """
        Sends a prompt to the Ollama local LLM endpoint.
        If Ollama is unreachable, returns None to trigger intelligent fallback.
        """
        endpoint = f"{self.base_url}/api/generate"
        payload: Dict[str, Any] = {
            "model": self.model,
            "prompt": prompt,
            "stream": False
        }
        if system_prompt:
            payload["system"] = system_prompt

        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                response = await client.post(endpoint, json=payload)
                if response.status_code == 200:
                    data = response.json()
                    return data.get("response", "").strip()
                else:
                    logger.warning(f"Ollama returned status {response.status_code}")
                    return None
        except Exception as e:
            logger.info(f"Ollama local service not reachable: {e}. Utilizing fallback intelligence engine.")
            return None

ollama_client = OllamaClient()
