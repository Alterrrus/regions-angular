package org.orion.region.controller;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.List;
import org.orion.region.error.EntityNotFoundException;
import org.orion.region.model.Region;
import org.orion.region.service.RegionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping(value = "/enter", produces = MediaType.APPLICATION_JSON_VALUE)

public class ControllerRegion {
 
  private final RegionService service;

  @Autowired
  public ControllerRegion(RegionService service) {
    this.service = service;
  }

  @GetMapping()
  @CrossOrigin(origins = "http://localhost:4200")
  public List<Region> getAll() {
    return service.getAll();
  }

  @GetMapping("/{id}")
  @CrossOrigin(origins = "http://localhost:4200")
 public Region getById(@PathVariable int id) throws EntityNotFoundException {
    return service.getById(id);
  }

  @GetMapping("/code/{code}")
  @CrossOrigin(origins = "http://localhost:4200")
 public Region getByCode(@PathVariable String code) throws EntityNotFoundException {
    return service.getByCode(code);
  }

  @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
  @ResponseStatus(value = HttpStatus.NO_CONTENT)
  @CrossOrigin(origins = "http://localhost:4200")
  public void update(@RequestBody Region region, @PathVariable int id){
    region.setId(id);
    service.update(region);
  }

  @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity<Region>createRegion(@RequestBody Region region){
    Region created=service.create(region);
    URI uriOfNewResource = ServletUriComponentsBuilder.fromCurrentContextPath().
        path("/enter"+"/{id}").buildAndExpand(created.getId()).toUri();
    return ResponseEntity.created(uriOfNewResource).body(created);
  }
  @DeleteMapping("/{id}")
  @CrossOrigin(origins = "http://localhost:4200")
  public boolean deleteById(@PathVariable int id){
    return service.delete(id);
  }

  @GetMapping(value = "/search")
  @CrossOrigin(origins = "http://localhost:4200")
  public List<Region>getByPattern(@RequestParam String param){
    String s= "%" + param + "%";
    return service.getByPattern(s);
  }



}
