package notice.backend.notice_api;

import lombok.Data;

@Data
public class NoteDTO {
    private String id;
    private String content;
    private String color;
}
