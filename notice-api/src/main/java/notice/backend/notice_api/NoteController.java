package notice.backend.notice_api;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/notes")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class NoteController {
    private Map<String, NoteDTO> notesStore = new HashMap<>();

    @GetMapping
    public ResponseEntity<List<NoteDTO>> getAllNotes() {
        List<NoteDTO> notes = new ArrayList<NoteDTO>(notesStore.values());
        return ResponseEntity.ok(notes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<NoteDTO> getNoteById(@PathVariable String id) {
        NoteDTO note = notesStore.get(id);
        return ResponseEntity.ok(note);
    }

    @PostMapping
    public ResponseEntity<NoteDTO> createNote(@RequestBody NoteDTO request) {
        NoteDTO note = notesStore.put(request.getId(), request);
        return new ResponseEntity<>(request, HttpStatus.CREATED);
    }
}

