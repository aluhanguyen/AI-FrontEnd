const DOMAIN_URL = "http://localhost:8080";

export const streamResponseSSE = (message, onChunk) => {
    const eventSource = new EventSource(`${DOMAIN_URL}/ai/generateStream?message=${encodeURIComponent(message)}`);

    eventSource.onmessage = (event) => {
        const chunk = event.data;
        console.log("Chunk received:", chunk);
        if (chunk === "[DONE]") {
            eventSource.close(); // Đóng kết nối khi luồng kết thúc
        } else {
            onChunk(chunk); // Gửi từng chunk tới giao diện
        }
    };

    eventSource.onerror = (error) => {
        console.error("Lỗi SSE:", error);
        eventSource.close(); // Đóng SSE nếu gặp lỗi
        onChunk("[Error]: Không thể nhận phản hồi từ server.");
    };
};

