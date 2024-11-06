package com.Pentaforce.IntelliHealth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.Pentaforce.IntelliHealth.entity.CommunityEntity;
import com.Pentaforce.IntelliHealth.service.CommunityService;

import java.util.List;

@RestController
@RequestMapping("/communities")
public class CommunityController {

    private final CommunityService communityService;

    @Autowired
    public CommunityController(CommunityService communityService) {
        this.communityService = communityService;
    }

    @PostMapping
    public ResponseEntity<CommunityEntity> createCommunity(@RequestBody CommunityEntity community) {
        return new ResponseEntity<>(communityService.createCommunity(community), HttpStatus.CREATED);
    }
    

    @GetMapping("/{id}")
    public ResponseEntity<CommunityEntity> getCommunityById(@PathVariable int id) {
        CommunityEntity community = communityService.getCommunityById(id);
        return community != null ? ResponseEntity.ok(community) : ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<CommunityEntity>> getAllCommunities() {
        return ResponseEntity.ok(communityService.getAllCommunities());
    }

    @PutMapping("/{id}")
    public ResponseEntity<CommunityEntity> updateCommunity(@PathVariable int id, @RequestBody CommunityEntity community) {
        CommunityEntity updatedCommunity = communityService.updateCommunity(id, community);
        return updatedCommunity != null ? ResponseEntity.ok(updatedCommunity) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCommunity(@PathVariable int id) {
        return communityService.deleteCommunity(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
